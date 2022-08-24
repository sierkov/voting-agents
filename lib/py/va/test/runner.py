import sys
if '/workspace/lib/py' not in sys.path: sys.path.append('/workspace/lib/py')

import unittest
from . import sort
from . import rank

loader = unittest.TestLoader()
suite = unittest.TestSuite()

for mod in (sort, rank):
    suite.addTests(loader.loadTestsFromModule(mod))

runner = unittest.TextTestRunner(verbosity=3)
result = runner.run(suite)
