import unittest

from ..rank import make_pairs

class TestRank(unittest.TestCase):

    def test_make_pairs_rank_idx(self):
        props = [
            {
                'pid': 'A',
                'rank_idx': 0,
                'num_full_views': 0,
                'num_card_views': 0
            },
            {
                'pid': 'B',
                'rank_idx': None,
                'num_full_views': 10,
                'num_card_views': 100
            }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', True),
                ('B', 'A', False)
            ]
        )

    def test_make_pairs_num_full_views(self):
        props = [
            {
                'pid': 'A',
                'rank_idx': None,
                'num_full_views': 0,
                'num_card_views': 0
            },
            {
                'pid': 'B',
                'rank_idx': None,
                'num_full_views': 10,
                'num_card_views': 0
            }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', False),
                ('B', 'A', True)
            ]
        )

    def test_make_pairs_num_card_views(self):
        props = [
            {
                'pid': 'A',
                'rank_idx': None,
                'num_full_views': 0,
                'num_card_views': 10
            },
            {
                'pid': 'B',
                'rank_idx': None,
                'num_full_views': 0,
                'num_card_views': 5
            }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', False),
                ('B', 'A', True)
            ]
        )

    def test_make_pairs_rank_idx_priority_1(self):
        props = [
            { 'pid': 'A', 'rank_idx': 0, 'num_full_views': 100, 'num_card_views': 10 },
            { 'pid': 'B', 'rank_idx': None, 'num_full_views': 20, 'num_card_views': 5 }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', True),
                ('B', 'A', False)
            ]
        )

    def test_make_pairs_rank_idx_priority_2(self):
        props = [
            { 'pid': 'A', 'rank_idx': 3, 'num_full_views': 100, 'num_card_views': 10 },
            { 'pid': 'B', 'rank_idx': 1, 'num_full_views': 20, 'num_card_views': 5 }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', False),
                ('B', 'A', True)
            ]
        )

    def test_make_pairs_rank_idx_priority_3(self):
        props = [
            { 'pid': 'A', 'rank_idx': None, 'num_full_views': 100, 'num_card_views': 10 },
            { 'pid': 'B', 'rank_idx': None, 'num_full_views': 20, 'num_card_views': 5 }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', True),
                ('B', 'A', False)
            ]
        )

    def test_make_pairs_rank_idx_priority_4(self):
        props = [
            { 'pid': 'A', 'rank_idx': None, 'num_full_views': 20, 'num_card_views': 10 },
            { 'pid': 'B', 'rank_idx': None, 'num_full_views': 20, 'num_card_views': 5 }
        ]
        self.assertEqual(
            make_pairs(props),
            [
                ('A', 'B', False),
                ('B', 'A', True)
            ]
        )

    def test_make_pairs_rank_idx_priority_5(self):
        props = [
            { 'pid': 'A', 'rank_idx': None, 'num_full_views': 20, 'num_card_views': 10 },
            { 'pid': 'B', 'rank_idx': None, 'num_full_views': 20, 'num_card_views': 10 }
        ]
        self.assertEqual(
            make_pairs(props),
            []
        )
