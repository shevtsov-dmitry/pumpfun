import logging
import requests

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup
)
from telegram.ext import (
    filters,
    ApplicationBuilder,
    MessageHandler,
    CommandHandler,
    ContextTypes,
    CallbackContext,
    CallbackQueryHandler
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)
host_server = "http://localhost:8080"

bot_token = "7174358430:AAHnTcLt8973faXvc7gq4x2SfJF-p64COH0"

admins = [749179973, 5006572203, 5519831621]

keyboard_options = [
    [InlineKeyboardButton("Check URLs", callback_data='check_urls')],
    [InlineKeyboardButton("Change URLs", callback_data='change_urls')],
    [InlineKeyboardButton("← Back", callback_data='admin_panel')]
]

QUERY = None


async def start(update: Update, context: CallbackContext) -> None:
    is_admin = update.effective_user.id in admins
    if not is_admin:
        text = "Вы не включены в список админов, обратитесь к @oh_darlin"
        await update.message.reply_text(text)
    else:
        text = ""
        await update.message.reply_text(text, reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton("Enter Admin Panel", callback_data='admin_panel')]],
        ))


async def handle_input(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_input = update.message.text
    new_url = user_input
    match QUERY.data:
        case 'change_url_twitter':
            await change_url("twitter", new_url)
        case 'change_url_dex':
            await change_url("dex", new_url)
        case 'change_url_tground':
            await change_url("tground", new_url)


async def change_url(to, user_input):
    resp = requests.put(f"{host_server}/urls/change?to={to}&url={user_input}")
    if resp.status_code == 200:
        await QUERY.edit_message_text(f"{to} URL changed. ✅",
                                      reply_markup=InlineKeyboardMarkup(keyboard_options))
    else:
        await QUERY.edit_message_text(f"Error changing {to} URL. ❌",
                                      reply_markup=InlineKeyboardMarkup(keyboard_options))


async def admin_panel(update: Update, context: CallbackContext) -> None:
    reply_markup = InlineKeyboardMarkup(keyboard_options)
    await update.callback_query.edit_message_text(text="Admin Panel", reply_markup=reply_markup)


async def admin_options(update: Update, context: CallbackContext) -> None:
    global QUERY
    query = update.callback_query
    QUERY = query
    reply_markup = InlineKeyboardMarkup([[InlineKeyboardButton("← Back", callback_data='admin_panel')]])

    match query.data:
        case "admin_panel":
            await admin_panel(update, context)
        case 'check_urls':
            await query.edit_message_text(text="Checking URLs...")
            await options_list_urls(query)
        case 'change_urls':
            await query.edit_message_text(text="Changing URLs...")
            await options_change_urls(query)
        case 'change_url_twitter':
            await query.edit_message_text("Please write new twitter url. Example: https://twitter.com/corvetteCar",
                                          reply_markup=reply_markup)
        case 'change_url_dex':
            await query.edit_message_text("Please write new telegram url. Example: https://twitter.com/corvetteCar",
                                          reply_markup=reply_markup)
        case 'change_url_tground':
            await query.edit_message_text("Please write new tensor url. Example: https://twitter.com/corvetteCar",
                                          reply_markup=reply_markup)


async def options_list_urls(query) -> None:
    try:
        resp = requests.get(host_server + "/urls/list")
        text = ""
        m = resp.json()
        for k, v in m.items():
            text = f"{text}{k} | {v}\n"
        await query.edit_message_text(text=text, reply_markup=InlineKeyboardMarkup(keyboard_options),
                                      disable_web_page_preview=True)
    except requests.RequestException as e:
        await query.message.reply_text("При попытке получить URL-адреса произошла ошибка",
                                       reply_markup=InlineKeyboardMarkup(keyboard_options))


async def options_change_urls(query):
    try:
        resp = requests.get(host_server + "/urls/list")
        m = resp.json()
        websites = []
        for website_name, _ in m.items():
            callback_data = f"change_url_{website_name}"
            websites.append([InlineKeyboardButton(website_name, callback_data=callback_data)])
        websites.append([InlineKeyboardButton("← Back", callback_data="admin_panel")])
        text = "Выберите URL-адрес веб-сайта, который вы хотите изменить"
        await query.edit_message_text(text=text, reply_markup=InlineKeyboardMarkup(websites))
    except requests.RequestException as e:
        await query.edit_message_text("При попытке получить URL-адреса произошла ошибка",
                                      reply_markup=InlineKeyboardMarkup(keyboard_options))


app = ApplicationBuilder().token(bot_token).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_input))
app.add_handler(CallbackQueryHandler(admin_options))

app.run_polling()