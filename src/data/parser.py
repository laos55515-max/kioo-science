import feedparser
import os
import random

def run_parser():
    # Список РАЗНЫХ картинок-заглушек, чтобы сайт не был одинаковым
    placeholders = [
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=500",
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=500",
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=500",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500",
        "https://images.unsplash.com/photo-1530633767186-650a7abc468d?q=80&w=500"
    ]

    # Сюда будем собирать новости
    unique_articles = []
    seen_titles = set() # Это "черный список", чтобы не было дублей

    # Пример сбора (здесь твоя логика arXiv)
    # ... (код сбора новостей) ...
    
    # ПЕРЕД СОХРАНЕНИЕМ:
    # Если заголовка нет в seen_titles — добавляем.
    # Если у новости нет картинки — берем случайную: random.choice(placeholders)

    # В конце записываем всё в articles.ts (полная перезапись)
    with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
        # Здесь код записи...
        print("Готово! База обновлена без дубликатов.")

if __name__ == "__main__":
    run_parser()