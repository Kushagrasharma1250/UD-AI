
# Tech_Stack.md
# UD-AI (Understanding Data AI) – Technology Stack

## Philosophy
Choose mature, modular, open technologies that support multimodal AI, scalability, and future research.

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- React Flow (knowledge graphs)

## Backend
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy

## AI Models
### LLM
- Qwen 3 (primary)
- OpenAI-compatible interface (optional)

### Vision-Language
- Qwen2.5-VL

### OCR
- PaddleOCR

## Document Processing
- PyMuPDF (PDF)
- python-docx
- python-pptx
- pandas
- openpyxl
- markdown
- Pillow

## Knowledge Layer
- Unified Knowledge Model (custom)
- NetworkX
- rdflib (future)
- FAISS / pgvector for semantic retrieval

## Database
- PostgreSQL
- pgvector
- Redis (cache & queues)
- MinIO (object storage)

## Background Processing
- Celery
- Redis
- AsyncIO

## Knowledge Poster Generation
- HTML/CSS templates
- SVG generation
- WeasyPrint (PDF)
- Pillow (PNG rendering)

## APIs
- FastAPI REST
- OpenAPI / Swagger

## Testing
- pytest
- Playwright
- Locust

## Monitoring
- Prometheus
- Grafana
- OpenTelemetry
- Sentry

## DevOps
- Docker
- Docker Compose
- Kubernetes (future)
- GitHub Actions

## Security
- JWT Authentication (future)
- HTTPS
- File validation
- Virus scanning
- Encryption in transit

## Recommended Folder Structure

frontend/
backend/
models/
parsers/
ukm/
reasoning/
poster/
storage/
workers/
tests/
docs/

## Selection Rationale

- Qwen 3: strong reasoning with open deployment.
- Qwen2.5-VL: multimodal understanding of documents, charts, and images.
- PaddleOCR: high-quality OCR for multilingual documents.
- FastAPI: high-performance Python backend.
- Next.js: modern production-ready frontend.
- PostgreSQL + pgvector: structured storage with semantic search.
- Redis + Celery: scalable asynchronous processing.
- Docker: reproducible deployment.

## Future Technology Evolution
- Knowledge APIs
- Multi-model routing
- Multi-agent workflows
- Enterprise connectors
- Mobile clients
- Desktop application

## Guiding Principle
Build a modular AI platform where any component can be upgraded independently without redesigning the entire system.
