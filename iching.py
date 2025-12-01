from random import choice
from enum import Enum

YIN = 0
YANG = 1

class Trigram(Enum):
    HEAVEN = 7
    LAKE = 6
    FIRE = 5
    THUNDER = 4
    WIND = 3
    WATER = 2
    MOUNTAIN = 1
    GROUND = 0

DIVINE = {
    Trigram.HEAVEN: ['☰', 'THE CREATIVE'],
    Trigram.LAKE: ['☱', 'THE JOYOUS'],
    Trigram.FIRE: ['☲', 'THE CLINGING'],
    Trigram.THUNDER: ['☳', 'THE AROUSING'],
    Trigram.WIND: ['☴', 'THE GENTLE'],
    Trigram.WATER: ['☵', 'THE ABYSSAL'],
    Trigram.MOUNTAIN: ['☶', 'KEEPING STILL'],
    Trigram.GROUND: ['☷', 'THE RECEPTIVE']
}

def flip() -> int:
    return choice([YIN, YANG])

def divine() -> tuple[Trigram, str, str]:
    trigram = Trigram((flip() << 2) + (flip() << 1) + flip())
    return (trigram, DIVINE[trigram])

print(divine())
print(divine())

# top = (flip(), flip(), flip())
# bottom = (flip(), flip(), flip())

# key = ((top << 2) + (top << 1) + top) * 8 + (bottom << 2) + (bottom << 1) + bottom

# print(DIVINE[top][0].value, DIVINE[top][0], DIVINE[top][1])
# print(DIVINE[bottom][0].value, DIVINE[bottom][0], DIVINE[bottom][1])

# yang_quantity = sum(top) + sum(bottom)
# yin_quantity = 6 - yang_quantity

# print(yang_quantity, 'YANG')
# print(yin_quantity, 'YIN')
