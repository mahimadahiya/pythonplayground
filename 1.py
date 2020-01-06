def avg(series):
    avg=0
    for i in series:
        avg+=i
    avg/=len(series)
    print("Average: ",avg)

arr=[]
for i in range(5):
    j=eval(input("Enter: "))
    arr.append(j)

avg(arr)
