# ML Models
Requirements:
- models should perform well in a Few-Shot Learning scenario (with only limited training data) since a typical voter will consider and provide reactions to only few proposals.
- the cost of fine-tuning/adjusting models should be reasonably low, since they must be periodically updated in response to the continious stream of voting decisions from a voter.

Currently, we have selected Sentence Transformers and SetFit as the approach. More information about these approaches:
- [Sentence Transformer Fine-Tuning (SetFit): Outperforming GPT-3 on few-shot Text-Classification while being 1600 times smaller](https://towardsdatascience.com/sentence-transformer-fine-tuning-setfit-outperforms-gpt-3-on-few-shot-text-classification-while-d9a3788f0b4e)
- [SentenceTransformers Documentation](https://www.sbert.net/)

## Semantic Search
To provide semantic search results, we use a custom model trained on [MSMarco dataset](https://www.sbert.net/examples/training/ms_marco/README.html).

## Proposal Similarity
To identify similar proposals, we use embeddings produced by a Sentence-Transformers model, and compute Cosine Similarity on top of those.

## Personalized Proposal Recommendations
We use two approaches to provide personalized recommendations:
- For cases requiring immediate updates, such as UI Recommendations to support proposal discovery, we use precomputed embeddings produced by a Sentence Transfomer model with aLogistic Regression classifier on top.
- To produce higher-quality recommendations but at much higher computational cost, [Cross-Encoder](https://www.sbert.net/examples/training/cross-encoder/README.html) approach is used.

## Proposal Classification
For the proposal classification, we use the SetFit approach referenced above.
