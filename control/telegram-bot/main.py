import os
import logging

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


host_server = "http://localhost:8080"  # TODO make env
bot_token = os.getenv("BOT_TOKEN")
QUERY = None

admins = [749179973, 5006572203, 5519831621]

keyboard_options = [
    [InlineKeyboardButton("check", callback_data="check")],
    [InlineKeyboardButton("add", callback_data="add")],
    [InlineKeyboardButton("change", callback_data="change")],
    [InlineKeyboardButton("delete", callback_data="delete")],
]

app = ApplicationBuilder().token(bot_token).build()


async def start(update: Update, context: CallbackContext) -> None:
    is_admin = update.effective_user.id in admins
    if not is_admin:
        text = "Вы не включены в список админов, обратитесь к @oh_darlin"
        await update.message.reply_text(text)
    else:
        text = ""
        await update.message.reply_text(
            text,
            reply_markup=InlineKeyboardMarkup(
                [
                    [
                        InlineKeyboardButton(
                            "Enter Admin Panel", callback_data="admin_panel"
                        )
                    ]
                ],
            ),
        )


async def admin_options(update: Update, context: CallbackContext) -> None:
    global QUERY
    query = update.callback_query
    QUERY = query
    reply_markup = InlineKeyboardMarkup(
        [[InlineKeyboardButton("← Back", callback_data="admin_panel")]]
    )


app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_input))
app.add_handler(CallbackQueryHandler(admin_options))

app.run_polling()


# async def change_url(to, user_input):
# resp = requests.put(f"{host_server}/urls/change?to={to}&url={user_input}")
# if resp.status_code == 200:
#     await QUERY.edit_message_text(
#         f"{to} URL changed. ✅", reply_markup=InlineKeyboardMarkup(keyboard_options)
#     )
# else:
#     await QUERY.edit_message_text(
#         f"Error changing {to} URL. ❌",
#         reply_markup=InlineKeyboardMarkup(keyboard_options),
# )
