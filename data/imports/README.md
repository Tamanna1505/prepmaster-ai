# Question Import Data

Working area for the question-bank / paper import system (see [`docs/QUESTION_IMPORT_GUIDE.md`](../../docs/QUESTION_IMPORT_GUIDE.md)).

```
data/imports/
├── raw/                 # your source notes / extracted text from OFFICIAL papers (not committed datasets)
│   ├── jee/
│   └── cat/
├── processed/           # validated, import-ready JSON
│   ├── jee/
│   └── cat/
└── templates/           # blank templates to copy from
```

Workflow:

1. Put your working notes from **official** previous-year papers + official answer keys in `raw/`.
2. Convert them into JSON following `templates/` and the taxonomy in [`docs/QUESTION_TAXONOMY.md`](../../docs/QUESTION_TAXONOMY.md). Save into `processed/`.
3. Validate: `npm run questions:validate -- data/imports/processed/<file>.json`
4. Import: `npm run questions:import -- ...` (subject-wise bank) or `npm run paper:import -- ...` (full paper).

Only use officially sourced, public previous-year questions with their source metadata. Do not commit paid/coaching content. The `example-*.json` files here contain **original demo questions**, not real exam questions.
