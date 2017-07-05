#https://www.interviewcake.com/question/java/merge-sorted-arrays?utm_source=weekly_email&utm_campaign=weekly_email&utm_medium=email
#expansions - sort without making a new array, sort an array of arrays of variable length

def my_function(arg, arg2):
    idx1, idx2 = 0, 0
    newarray = []
    while (idx1 < len(arg) and idx2 < len(arg2)):
        if arg[idx1] < arg2[idx2]:
            newarray.append(arg[idx1])
            idx1 += 1
        else:
            newarray.append(arg2[idx2])
            idx2 += 1
    newarray = newarray + arg[idx1:]
    newarray = newarray + arg2[idx2:]
    return newarray

# run your function through some test cases here
# remember: debugging is half the battle!
print my_function([5, 7, 8], [])
