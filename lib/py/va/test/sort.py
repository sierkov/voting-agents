import random
import unittest
from timeit import timeit
from time import sleep
from functools import cmp_to_key

from ..sort import sort_merge

class TestSort(unittest.TestCase):
    random_seed = 1234

    def test_sort_manual(self):
        self.assertEqual(sort_merge([1, 7, 3, 1, 0], lambda a, b: a > b), [0, 1, 1, 3, 7])

    def test_sort_manual_reverse(self):
        self.assertEqual(sort_merge([1, 7, 3, 1, 0], lambda a, b: a < b), [7, 3, 1, 1, 0])

    def test_sort_random(self):
        random.seed(self.random_seed)
        for i in range(0, 10):
            lst = list(map(lambda i: random.random(), range(0, 100)))
            a = sort_merge(lst, lambda a, b: a > b)
            b = list(sorted(lst))
            self.assertEqual(a, b)

    def test_sort_random_reveerse(self):
        random.seed(self.random_seed)
        for i in range(0, 10):
            lst = list(map(lambda i: random.random(), range(0, 100)))
            a = sort_merge(lst, lambda a, b: a < b)
            b = list(reversed(sorted(lst)))
            self.assertEqual(a, b)

    def test_performance(self):
        random.seed(self.random_seed)
        lst = list(map(lambda i: random.random(), range(0, 100)))
        def mycmp(a, b):
            s = 0
            for i in range(0, 100): # simulate time-consuming algebra as with ML predictions
                s += a ** 2 - b ** 2
            return s < 0
        duration_a = timeit(lambda: sort_merge(lst, mycmp), number=100)
        def mycmp2(a, b):
            if mycmp(a, b): return 1
            elif mycmp(b, a): return -1
            else: return 0
        duration_b = timeit(lambda: list(sorted(lst, key=cmp_to_key(mycmp2))), number=100)
        self.assertLess(duration_a, duration_b)

