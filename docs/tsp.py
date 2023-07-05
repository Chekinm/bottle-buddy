import numpy as np
from python_tsp.exact import solve_tsp_dynamic_programming
from python_tsp.heuristics import solve_tsp_simulated_annealing
from math import inf

# distance_matrix = np.array([[0, 904, 2254, 1308, 0],
#                             [783, 0, 1996, 1297, inf], 
#                             [2231, 1767, 0, 2259, inf], 
#                             [1160, 1368, 2204, 0, inf],
#                             [0, inf, inf, inf, 0],
#                             ])


# distance_matrix = np.array([[0, 904, 2254, 1308, 0],
#                             [783, 0, 1996, 1297, 10000], 
#                             [2231, 1767, 0, 2259, 10000], 
#                             [1160, 1368, 2204, 0, 10000],
#                             [0, 10000, 10000, 10000, 0],
#                             ])



# distance_matrix = np.array([[0, 1454, 1163, 2857, 3265, 0], 
#  [844, 0, 792, 3328, 3736, 100000], 
#  [922, 1161, 0, 2566, 2974, 100000], 
#  [3427, 3666, 3013, 0, 408, 100000], 
#  [3481, 3721, 3316, 408, 0, 0],
#  [0, 100000, 100000, 100000, 100000, 0],
# ])


distance_matrix = np.array([[0, 3265, 1454, 1163, 2857, 0], 
 [3481, 0, 3721, 3316, 408, 100000], 
 [844, 3736, 0, 792, 3328, 100000], 
 [922, 2974, 1161, 0, 2566, 100000], 
 [3427, 408, 3666, 3013, 0, 0],
  [0, 100000, 100000, 100000, 100000, 0],
])




permutation, distance = solve_tsp_dynamic_programming(distance_matrix)
print('dynamic', permutation, distance)

permutation, distance = solve_tsp_simulated_annealing(distance_matrix)

print('heuretic', permutation, distance)
