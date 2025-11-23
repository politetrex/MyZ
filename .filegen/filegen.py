date = int(input())
rs = ""
while date:
    mod = date % 52
    map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    rs = map[mod] + rs
    date //= 52
print(rs)