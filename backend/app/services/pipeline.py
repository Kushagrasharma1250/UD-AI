from __future__ import annotations

from typing import Dict, Any

from backend.app.models.ukm import UKMDocument
from backend.app.schema.contracts import ArtifactRequest, DocumentUploadRequest, ProcessingJob


class ProcessingPipeline:
    """Coordinate the Phase 1 document-to-UKM flow."""

    def __init__(self) -> None:
        self.jobs: Dict[str, ProcessingJob] = {}

    def create_job(self, request: DocumentUploadRequest) -> ProcessingJob:
        job = ProcessingJob(job_id="job-001", document_id="doc-001", metadata={"file_name": request.file_name})
        self.jobs[job.job_id] = job
        return job

    def build_ukm(self, document_id: str) -> UKMDocument:
        return UKMDocument(
            document_id=document_id,
            title="Generated UKM",
            source_type="unknown",
            learning_objectives=["Understand the source material"],
            applications=["Knowledge poster generation"],
            takeaways=["Structured representation created"],
        )

    def generate_artifact(self, request: ArtifactRequest) -> Dict[str, Any]:
        return {
            "document_id": request.document_id,
            "artifact_type": request.artifact_type,
            "language": request.language,
            "difficulty": request.difficulty,
            "status": "ready",
        }
