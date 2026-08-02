from backend.app.models.ukm import Evidence, Relationship, UKMDocument, Concept


def test_ukm_document_serializes_core_phase1_entities():
    evidence = Evidence(source="document:1", excerpt="Transformers process sequences", confidence=0.92)
    concept = Concept(
        id="concept-1",
        name="Transformer",
        description="A neural architecture for sequence modeling",
        keywords=["attention", "sequence"],
        evidence=[evidence],
        confidence=0.91,
    )
    relationship = Relationship(
        source="concept-1",
        target="concept-2",
        relation_type="depends_on",
        evidence=[evidence],
    )

    document = UKMDocument(
        document_id="doc-001",
        title="Transformer Overview",
        source_type="pdf",
        concepts=[concept],
        relationships=[relationship],
        learning_objectives=["Understand attention"],
        applications=["Language modeling"],
        takeaways=["Transformers are sequence models"],
    )

    payload = document.to_dict()

    assert payload["document_id"] == "doc-001"
    assert payload["concepts"][0]["name"] == "Transformer"
    assert payload["relationships"][0]["relation_type"] == "depends_on"
    assert payload["learning_objectives"][0] == "Understand attention"
