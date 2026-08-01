
# UD-AI (Understanding Data AI)

> **Transform Information into Understanding**

UD-AI is a Universal Knowledge Understanding Platform that accepts documents, spreadsheets, presentations, images, and other knowledge sources, understands their content, constructs a Unified Knowledge Model (UKM), and generates explainable visual knowledge artifacts such as Knowledge Posters, Executive Summaries, and more.

---

## Vision

To augment human intelligence by transforming information from any structured or unstructured source into explainable, reusable, and personalized knowledge.

---

## Key Features

### Supported Inputs
- PDF
- DOCX
- PPTX
- XLSX
- CSV
- TXT / Markdown
- PNG / JPG

### AI Pipeline
1. Universal Parsing
2. OCR & Layout Analysis
3. Multimodal Understanding
4. Unified Knowledge Model (UKM)
5. Knowledge Graph Construction
6. Reasoning & Validation
7. Knowledge Compression
8. Knowledge Poster Generation

### MVP Outputs
- Knowledge Poster (A4/A3)
- Executive Summary
- UKM JSON
- PDF Export
- PNG Export

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | FastAPI |
| LLM | Qwen 3 |
| Vision | Qwen2.5-VL |
| OCR | PaddleOCR |
| Parsing | PyMuPDF, python-docx, python-pptx, pandas, openpyxl |
| Database | PostgreSQL + pgvector |
| Cache | Redis |
| Queue | Celery |
| Storage | MinIO |
| Deployment | Docker |

---

## Repository Structure

```text
UD-AI/
├── docs/
├── frontend/
├── backend/
├── parsers/
├── ukm/
├── reasoning/
├── poster/
├── workers/
├── storage/
├── tests/
└── README.md
```

---

## Development Roadmap

- Stage 0 – Research & Product Definition
- Stage 1 – System Architecture
- Stage 2 – Universal Parsing
- Stage 3 – Multimodal Understanding
- Stage 4 – Unified Knowledge Model
- Stage 5 – Knowledge Graph & Reasoning
- Stage 6 – Knowledge Poster Engine
- Stage 7 – Web Application
- Stage 8 – Testing & Evaluation
- Stage 9 – MVP Release

---

## Long-Term Goals

- Universal Knowledge Infrastructure
- Explainable AI
- Personalized Learning
- Enterprise Knowledge Platform
- Research Publications
- Open-Core Ecosystem

---

## Guiding Principles

- Parse Once. Understand Once. Reuse Everywhere.
- Every output originates from the Unified Knowledge Model.
- Every generated statement is evidence-backed.
- Understanding is more important than summarization.

---

## License

Open Core

Core components will be open source, with enterprise and premium capabilities planned for future releases.

---

## Status

🚧 **Stage 0 – Planning & Architecture**
