from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class DocumentUploadRequest:
    file_name: str
    source_type: str
    file_path: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "file_name": self.file_name,
            "source_type": self.source_type,
            "file_path": self.file_path,
            "metadata": self.metadata or {},
        }


@dataclass
class ProcessingJob:
    job_id: str
    document_id: str
    status: str = "queued"
    progress: int = 0
    artifacts: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class ArtifactRequest:
    document_id: str
    artifact_type: str = "poster"
    language: str = "en"
    difficulty: str = "beginner"
    metadata: Dict[str, Any] = field(default_factory=dict)
