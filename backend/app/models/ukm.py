from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class Evidence:
    source: str
    excerpt: str
    confidence: float = 0.0


@dataclass
class Concept:
    id: str
    name: str
    description: str
    keywords: List[str] = field(default_factory=list)
    evidence: List[Evidence] = field(default_factory=list)
    confidence: float = 0.0


@dataclass
class Relationship:
    source: str
    target: str
    relation_type: str
    evidence: List[Evidence] = field(default_factory=list)


@dataclass
class UKMDocument:
    document_id: str
    title: str
    source_type: str
    concepts: List[Concept] = field(default_factory=list)
    relationships: List[Relationship] = field(default_factory=list)
    learning_objectives: List[str] = field(default_factory=list)
    applications: List[str] = field(default_factory=list)
    takeaways: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return self._serialize(self)

    @classmethod
    def from_dict(cls, payload: Dict[str, Any]) -> "UKMDocument":
        data = dict(payload)
        data["concepts"] = [Concept(**item) for item in data.get("concepts", [])]
        data["relationships"] = [Relationship(**item) for item in data.get("relationships", [])]
        return cls(**data)

    @staticmethod
    def _serialize(value: Any) -> Any:
        if isinstance(value, (str, int, float, bool)) or value is None:
            return value
        if isinstance(value, dict):
            return {key: UKMDocument._serialize(item) for key, item in value.items()}
        if isinstance(value, (list, tuple)):
            return [UKMDocument._serialize(item) for item in value]
        if hasattr(value, "__dataclass_fields__"):
            return {key: UKMDocument._serialize(item) for key, item in asdict(value).items()}
        return value
