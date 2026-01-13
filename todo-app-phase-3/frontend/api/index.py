import sys
import os

# Add the backend_core directory to sys.path so we can import from it
# In Vercel, the file structure might be flattened, but generally 
# if api/index.py is executed, we need to find backend_core sibling to api?
# No, we moved api INTO frontend, so structure is:
# frontend/
#   api/index.py
#   backend_core/
#   package.json

sys.path.append(os.path.join(os.path.dirname(__file__), '../backend_core'))

from main import app