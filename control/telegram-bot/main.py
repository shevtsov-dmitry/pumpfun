import logging
import requests

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    filters,
    ApplicationBuilder,
    MessageHandler,
    CommandHandler,
    ContextTypes,
    CallbackContext,
    CallbackQueryHandler,
)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

OPTION = None
host_server = "http://localhost:8080"  # TODO make env
bot_token = "7174358430:AAH1Y7BX5B0ZN6kTxlG6U3rpwsljeDp4R6U"
admins = [749179973, 5006572203, 5519831621]

keyboard_options = [
    [InlineKeyboardButton("Показать все", callback_data="check")],
    # [InlineKeyboardButton("add", callback_data="add")],
    [InlineKeyboardButton("Изменить", callback_data="change")],
    # [InlineKeyboardButton("delete", callback_data="delete")],
]

app = ApplicationBuilder().token(bot_token).build()


async def start(update: Update, context: CallbackContext) -> None:
    is_admin = update.effective_user.id in admins
    if not is_admin:
        text = "Вы не включены в список админов, обратитесь к @oh_darlin"
        await update.message.reply_text(text)
    else:
        text = "Опции бота"
        await update.message.reply_text(
            text,
            reply_markup=InlineKeyboardMarkup(
                keyboard_options,
            ),
        )


async def admin_options(update: Update, context: CallbackContext) -> None:
    global OPTION
    query = update.callback_query
    OPTION = query
    reply_markup = InlineKeyboardMarkup(
        [[InlineKeyboardButton("← Back", callback_data="back")]]
    )

    match query.data:
        case "back":
            await query.edit_message_text(
                "Опции бота",
                reply_markup=InlineKeyboardMarkup(keyboard_options),
            )
            pass
        case "check":
            await check(query)
            pass
        case "change":
            await change(query)
            pass
        case "change_url_pumpfun":
            await query.edit_message_text(
                "Введи новый адрес pumpfun. Пример: https://twitter.com/corvetteCar",
                reply_markup=reply_markup,
            )
        case "change_url_twitter":
            await query.edit_message_text(
                "Введи новый адрес twitter. Пример: https://twitter.com/corvetteCar",
                reply_markup=reply_markup,
            )
        case "change_url_telegram":
            await query.edit_message_text(
                "Введи новый адрес telegram. Пример: https://twitter.com/corvetteCar",
                reply_markup=reply_markup,
            )
        case "change_url_CA":
            await query.edit_message_text(
                "Введи новый адрес CA.\nПример: 5Xu4Z2yw8ox1senjJxZ7ecdZPBDwJJPbjLKJXMYmpump",
                reply_markup=reply_markup,
            )


async def check(query) -> None:
    try:
        resp = requests.get(host_server + "/urls/list")
        text = ""
        m = resp.json()
        for k, v in m.items():
            text = f"{text}{k} | {v}\n"
        await query.edit_message_text(
            text=text,
            reply_markup=InlineKeyboardMarkup(keyboard_options),
            disable_web_page_preview=True,
        )
    except requests.RequestException as e:
        await query.message.reply_text(
            "При попытке получить URL-адреса произошла ошибка",
            reply_markup=InlineKeyboardMarkup(keyboard_options),
        )


async def change(query) -> None:
    try:
        resp = requests.get(host_server + "/urls/list")
        options = []
        m = resp.json()

        for k, v in m.items():
            options.append([InlineKeyboardButton(k, callback_data=f"change_url_{k}")])

        options.append([InlineKeyboardButton("← Back", callback_data="back")])

        await query.edit_message_text(
            text="Выбери что изменить",
            reply_markup=InlineKeyboardMarkup(options),
            disable_web_page_preview=True,
        )
    except requests.RequestException as e:
        await query.message.reply_text(
            "При попытке получить URL-адреса произошла ошибка",
            reply_markup=InlineKeyboardMarkup(keyboard_options),
        )


async def handle_input(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_input = update.message.text
    new_url = user_input
    match OPTION.data:
        case "change_url_twitter":
            await change_url("twitter", new_url)
        case "change_url_telegram":
            await change_url("telegram", new_url)
        case "change_url_CA":
            await change_url("CA", new_url)
        case "change_url_pumpfun":
            await change_url("pumpfun", new_url)


async def change_url(to, user_input):
    resp = requests.patch(
        f"{host_server}/urls/change?website_name={to}&url={user_input}"
    )
    if resp.status_code == 200:
        await OPTION.edit_message_text(
            f"Ссылка изменена на {to}. ✅",
            reply_markup=InlineKeyboardMarkup(keyboard_options),
        )
    else:
        await OPTION.edit_message_text(
            f"Ошибка изменения {to}. Вероятно использованы неподдерживаемые символы ❌",
            reply_markup=InlineKeyboardMarkup(keyboard_options),
        )


app.add_handler(CommandHandler("start", start))
app.add_handler(CallbackQueryHandler(admin_options))
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_input))

app.run_polling()
