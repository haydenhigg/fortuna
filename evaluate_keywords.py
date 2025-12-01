import csv
import re

with open('./quotes.csv') as f:
    reader = csv.reader(f)
    next(reader)
    rows = [(row[0], row[1], row[2].split(',')) for row in reader]

freqs = {}

for row in rows:
    for keyword in row[2]:
        if keyword in freqs:
            freqs[keyword] += 1
        else:
            freqs[keyword] = 1

out_rows = []
for row in rows:
    keywords = []
    for keyword in row[2]:
        if freqs[keyword] > 1:
            keywords.append(keyword)

    out_rows.append((row[0], row[1], ' '.join(keywords)))

with open('quotes-new.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow(['quote', 'author', 'keywords'])
    writer.writerows(out_rows)

# items = sorted(freqs.items(), key=lambda item: item[1], reverse=True)
# for k, v in items[:50]:
#     print(k, '-', 10)
