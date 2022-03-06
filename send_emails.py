from urllib import request, error
import json
import os
from pathlib import Path
import datetime
from typing import *


from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


FROM_EMAIL = os.environ["FROM_EMAIL"]
SITE = os.environ["SITE"]
UNSUB_URL = os.environ["UNSUB_URL"]
DROPBOX_KEY = os.environ["DROPBOX_KEY"]
SENDGRID_KEY = os.environ["SENDGRID_KEY"]


def get_front_matter(file: str) -> Dict[str, str]:
    with open(file) as f:
        lines = f.readlines()

    front_lines = []
    matter = {}
    for line in lines[1:]:
        if line.startswith("--"):
            break
        line = line.strip()
        name, value = line.split(": ")
        matter[name] = value.strip("'").strip('"')
        front_lines.append(line.strip())

    return matter


def get_recent_posts(days_back=7):
    content_dir = Path(__file__).resolve().parent / "content"
    now = datetime.datetime.now()

    recent_posts = []
    for index in content_dir.glob("**/index.md"):
        url = f"{SITE}/{index.parent.name}/"

        matter = get_front_matter(index)
        matter["date"] = datetime.datetime.strptime(matter["date"], "%Y-%m-%d")
        if "draft" in matter or matter["date"] > now:
            continue

        if matter["date"] > now - datetime.timedelta(days=days_back):
            pass
        else:
            continue

        recent_posts.append(
            {
                "date": matter["date"],
                "url": url,
                "title": matter["title"],
            }
        )

    return recent_posts


def get_file(path):
    body = {"path": path}
    full_url = "https://content.dropboxapi.com/2/files/download"
    headers = {
        "Authorization": f"Bearer {DROPBOX_KEY}",
        "Dropbox-API-Arg": json.dumps(body),
    }
    req = request.Request(full_url, headers=headers, method="POST")

    try:
        with request.urlopen(req) as response:
            content = response.read().decode()
            return content
    except error.HTTPError as e:
        print(e)
        return ""


def get_emails() -> List[str]:
    email_content = get_file("/abc/emails.txt")
    emails = list(set(x.strip() for x in email_content.split("\n")))

    unsubbed_content = get_file("/abc/unsub.txt")
    unsubbed = list(set(x.strip() for x in unsubbed_content.split("\n")))

    return list(set(emails) - set(unsubbed))


def email_content(recent_posts, to_email) -> Tuple[str, str]:
    lis = []
    for post in recent_posts:
        date = post["date"].strftime("%m/%d/%y")
        lis.append(f'<li>{date} - <a href="{post["url"]}">{post["title"]}</a>')
    lis = "\n".join(lis)
    html = f"""
    <html>
    <head></head>
    <body>
        <h1>
            <a href="{SITE}">What's Cookin'</a>? Let's find out!
        </h1>
        <p>
            <b>Recent posts</b>
            <ul>
                {lis}
            </ul>
        </p>
        <a href="{UNSUB_URL}?email={to_email}"><small>Unsubscribe</small></a>
    </body>
    </html>
    """.strip()

    return html, ""


def send_emails(emails, recent_posts):
    sg = SendGridAPIClient(SENDGRID_KEY)

    errs = []
    for to_email in emails:
        try:
            html, plain = email_content(recent_posts, to_email)
            message = Mail(
                from_email=FROM_EMAIL,
                to_emails=to_email,
                subject="What's Cookin dot biz",
                html_content=html,
            )
            response = sg.send(message)
            print(response.status_code)
        except Exception as e:
            print(e)
            errs.append(e)

    if len(errs) > 0:
        print("errors sending mail", errs)
        exit(0)
    else:
        print("sent mail")


if __name__ == "__main__":
    recent_posts = get_recent_posts()
    if len(recent_posts) == 0:
        exit(0)

    print(f"Found {len(recent_posts)} new posts")

    emails = get_emails()
    send_emails(emails, recent_posts)
