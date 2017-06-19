#example of sum algorithm
sum = lambda a : sum(a[:len(a)/2]) + sum(a[len(a)/2:]) if (len(a) >= 2) else ( a[0] if (len(a) == 1) else 0)
