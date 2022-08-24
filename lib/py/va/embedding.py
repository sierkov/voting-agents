from itertools import islice, repeat

def tokens_to_text(tokens):
    text = ''
    for tok in tokens:
        if tok.startswith('##'):
            text += tok[2:]
        else:
            text += ' ' + tok
    return text

def split_long_text(model, text):
    res = []
    tokens = model.tokenizer.tokenize(text)
    pos = 0
    while len(tokens) - pos > 0:
        if len(tokens) - pos > model.max_seq_length:
            split_idx = pos + model.max_seq_length
            for idx in range(split_idx - 1, pos, -1):
                if tokens[idx] == '.':
                    split_idx = idx + 1
                    break
            text_part = tokens[pos:split_idx]
        else:
            text_part = tokens[pos:]
        res.append(tokens_to_text(text_part))
        pos += len(text_part)
    return res

def encode_long_text(model, texts):
    lengths = []
    text_parts = []
    for i, text in enumerate(texts):
        sub_texts = split_long_text(model, text)
        text_parts.extend(sub_texts)
        lengths.append(len(sub_texts))
    embeddings_tmp = model.encode(text_parts)
    embeddings = []
    idx = 0
    for l in lengths:
        embeddings.append(embeddings_tmp[idx:idx+l].mean(axis=0))
        idx += l
    print(len(embeddings_tmp), len(embeddings))
    return embeddings
