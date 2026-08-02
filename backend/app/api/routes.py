from fastapi import APIRouter

from backend.app.schema.contracts import ArtifactRequest, DocumentUploadRequest
from backend.app.services.pipeline import ProcessingPipeline

router = APIRouter()
pipeline = ProcessingPipeline()


@router.post("/upload")
def upload_document(request: DocumentUploadRequest):
    job = pipeline.create_job(request)
    return {"job": job.__dict__}


@router.post("/artifact")
def generate_artifact(request: ArtifactRequest):
    return pipeline.generate_artifact(request)
