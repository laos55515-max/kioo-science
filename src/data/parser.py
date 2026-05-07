import feedparser
from deep_translator import GoogleTranslator
import datetime
import re
import os

# Настройка переводчика
translator = GoogleTranslator(source='en', target='ru')

# Категории arXiv и соответствующие теги
categories = {
    'physics': 'Физика',
    'math': 'Математика',
    'q-bio': 'Биология',
    'cs': 'Технологии',
    'econ': 'Экономика',
    'stat': 'Статистика',
    'eess': 'Электротехника'
}

def get_keyword(title):
    """Извлекает ключевое слово из заголовка для Unsplash."""
    words = title.lower().split()[:3]
    keyword = '-'.join(words).replace(',', '').replace('.', '').replace(':', '').replace(';', '')
    return keyword if keyword else 'science'

def parse_articles():
    """Парсит статьи из arXiv по категориям."""
    new_articles = []
    for cat, tag in categories.items():
        url = f'http://export.arxiv.org/rss/{cat}'
        print(f"Парсинг категории {cat}...")
        feed = feedparser.parse(url)
        for entry in feed.entries[:3]:  # 3 самые свежие
            title_en = entry.title
            summary_en = entry.summary
            # Очистить summary от arXiv метаданных
            if 'Abstract:' in summary_en:
                summary_en = summary_en.split('Abstract:', 1)[1].strip()
            title_ru = translator.translate(title_en).replace('\n', ' ').strip()
            summary_ru = translator.translate(summary_en).replace('\n', ' ').strip()
            author = entry.authors[0]['name'] if entry.authors else 'Неизвестен'
            arxiv_id = entry.id.split('/')[-1].replace('.', '-')
            article_id = f'arxiv-auto-{arxiv_id}'
            date = datetime.datetime.now().strftime('%d %B %Y')
            keyword = get_keyword(title_en)
            image_url = f'https://source.unsplash.com/1600x900/?{keyword}'
            fallback_url = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000'
            if not keyword or not image_url.startswith('http') or 'placeholder' in image_url.lower():
                image_url = fallback_url
                alt = 'science'
            else:
                alt = keyword
            article = {
                'id': article_id,
                'date': date,
                'tag': tag,
                'title': title_ru,
                'subtitle': summary_ru[:150] + '...' if len(summary_ru) > 150 else summary_ru,
                'author': author,
                'readingTime': 6,
                'previewImage': {'url': image_url, 'alt': alt},
                'headerImage': {'url': image_url, 'alt': alt},
                'excerpt': summary_ru,
                'sections': [{'heading': 'Аннотация оригинального исследования', 'body': summary_ru}]
            }
            new_articles.append(article)
    return new_articles

def format_article(article):
    """Форматирует статью в TS код."""
    lines = []
    lines.append('  {')
    lines.append(f"    id: '{article['id']}',")
    lines.append(f"    date: '{article['date']}',")
    lines.append(f"    tag: '{article['tag']}',")
    lines.append(f"    title: `{article['title']}`,")  # Используем backticks для многострочного текста
    lines.append(f"    subtitle: `{article['subtitle']}`,")  # Но поскольку переведено, может содержать кавычки
    lines.append(f"    author: '{article['author']}',")
    lines.append(f"    readingTime: {article['readingTime']},")
    lines.append("    previewImage: {")
    lines.append(f'      url: "{article["previewImage"]["url"]}",')
    lines.append(f'      alt: "{article["previewImage"]["alt"]}"')
    lines.append("    },")
    lines.append("    headerImage: {")
    lines.append(f'      url: "{article["headerImage"]["url"]}",')
    lines.append(f'      alt: "{article["headerImage"]["alt"]}"')
    lines.append("    },")
    lines.append(f"    excerpt: `{article['excerpt']}`,")
    lines.append("    sections: [")
    for sec in article['sections']:
        lines.append("      {")
        if 'heading' in sec:
            lines.append(f"        heading: '{sec['heading']}',")
        lines.append(f"        body: `{sec['body']}`")
        lines.append("      }")
    lines.append("    ]")
    lines.append('  }')
    return '\n'.join(lines)

def update_articles_ts(new_articles):
    """Обновляет articles.ts, полностью перезаписывая файл свежими данными."""
    file_path = os.path.join(os.path.dirname(__file__), 'articles.ts')
    
    # Фильтровать новые статьи по title, если файл существует
    existing_titles = set()
    existing_articles = []
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        existing_titles = set(re.findall(r"title: `([^`]+)`", content))
        
        # Извлечь существующие статьи как строки
        start = content.find('export const articles: ArticleData[] = [')
        if start != -1:
            end = content.rfind('];')
            array_str = content[start:end+2]
            articles_list = array_str[array_str.find('[')+1:array_str.rfind(']')].strip()
            if articles_list.endswith(','):
                articles_list = articles_list[:-1]
            raw_articles = articles_list.split('},\n  {')
            existing_articles = []
            for raw in raw_articles:
                if raw.strip():
                    art = '  {' + raw + '}'
                    existing_articles.append(art)
    
    # Фильтровать новые
    unique_new_articles = [a for a in new_articles if a['title'] not in existing_titles]
    
    # Собрать все статьи
    all_formatted = [format_article(a) for a in unique_new_articles] + existing_articles
    
    # Ограничить до 50
    if len(all_formatted) > 50:
        all_formatted = all_formatted[:50]
    
    # Сгенерировать новый content
    new_content = 'export const articles: ArticleData[] = [\n' + ',\n'.join(all_formatted) + '\n];'
    
    # Перезаписать файл
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Добавлено {len(unique_new_articles)} новых статей. Общее количество: {len(all_formatted)}.")

if __name__ == "__main__":
    print("Запуск парсера arXiv...")
    new_articles = parse_articles()
    update_articles_ts(new_articles)
    print("Готово!")