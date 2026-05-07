import feedparser
import os
import random
import re

def run_parser():
    # НАСТОЯЩИЕ РАБОЧИЕ ССЫЛКИ. Теперь никаких битых иконок!
    placeholders = [
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800",
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800",
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
        "https://images.unsplash.com/photo-1530633767186-650a7abc468d?q=80&w=800",
        "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800",
        "https://images.unsplash.com/photo-1564323232327-175aa60b8d4b?q=80&w=800",
        "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=800",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800",
        "https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=800"
    ]

    # Твои категории arXiv
    categories = {
        'physics': 'Физика',
        'math': 'Математика',
        'q-bio': 'Биология',
        'cs': 'Технологии',
        'econ': 'Экономика'
    }

    all_articles = []
    seen_titles = set()

    for cat_id, cat_name in categories.items():
        print(f"Парсинг: {cat_name}...")
        url = f"http://export.arxiv.org/api/query?search_query=cat:{cat_id}&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending"
        feed = feedparser.parse(url)

        for entry in feed.entries:
            if entry.title not in seen_titles:
                article = {
                    'id': entry.id.split('/')[-1],
                    'title': entry.title.replace('\n', ' '),
                    'description': entry.summary.replace('\n', ' ')[:200] + '...',
                    'category': cat_name,
                    'date': '7 мая 2026',
                    'image': random.choice(placeholders), # Выбираем случайную живую картинку
                    'link': entry.link
                }
                all_articles.append(article)
                seen_titles.add(entry.title)

    # Записываем всё в файл (начиная с этого момента)
    import json
    file_path = 'articles.ts'
    
    with open(file_path, 'w', encoding='utf-8') as f:
        # json.dumps сделает правильные двойные кавычки для JavaScript
        json_data = json.dumps(all_articles, ensure_ascii=False)
        f.write(f"export const articles = {json_data};")
    
    print(f"Готово! Собрано {len(all_articles)} чистых статей.")

if __name__ == "__main__":
    run_parser()