from sentence_transformers import SentenceTransformer
embedder = SentenceTransformer('multi-qa-mpnet-base-dot-v1', device='cpu')
