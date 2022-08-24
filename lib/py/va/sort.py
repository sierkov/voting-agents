__all__ = ['merge_sort']

def sort_two(lst, cmp):
    if len(lst) > 2: raise RuntimeError(f'Internal Error: the list is too long: {len(lst)}')
    if len(lst) < 1: raise RuntimeError(f'List too short: {len(lst)}')
    if len(lst) == 1: return lst
    if cmp(lst[0], lst[1]): return (lst[1], lst[0])
    return lst

def merge(lst1, lst2, cmp):
    res = []
    while len(lst1) + len(lst2):
        if len(lst1) >= 1 and len(lst2) >= 1:
            best = sort_two((lst1[0], lst2[0]), cmp)
            if best[0] == lst1[0]:
                res.append(lst1[0])
                lst1 = lst1[1:]
            else:
                res.append(lst2[0])
                lst2 = lst2[1:]
        elif len(lst1) > 0:
            res.extend(lst1)
            lst1 = []
        else:
            res.extend(lst2)
            lst2 = []
    return res

def sort_merge(lst, cmp):
    if type(lst) != list: raise RuntimeError(f'Unexpected value: {type(lst)}!')
    if len (lst) <= 2:
        return sort_two(lst, cmp)
    else:
        mid = len(lst) // 2
        l = sort_merge(lst[:mid], cmp)
        r = sort_merge(lst[mid:], cmp)
        return merge(l, r, cmp)
