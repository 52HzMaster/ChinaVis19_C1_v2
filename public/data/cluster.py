# -*- coding: utf-8 -*-
import sys
import csv
import json

reload(sys)
sys.setdefaultencoding('utf-8')


def get_x_y(sid):
    x = int(sid.__getslice__(1, 3))
    y = int(sid.__getslice__(3, 5))
    return [x,y]


def area_judge(sid):
    floor = int(sid.__getslice__(0, 1))
    x = int(sid.__getslice__(1, 3))
    y = int(sid.__getslice__(3, 5))

    if floor == 1:
        if (x == 13 and y == 0) or (x == 15 and y == 2) or (x == 15 and y == 4) or (x == 15 and y == 7):
            return "area_in"
        elif (x == 15 and y == 5)or (x == 15 and y == 15) or (x == 15 and y == 17) or (x == 0 and y == 19) :
            return "area_out"
        elif 2 <= x <= 3 and 1 <= y <= 5:
            return "area_A"
        elif 4 <= x <= 5 and 1 <= y <= 5:
            return "area_B"
        elif 6 <= x <= 7 and 1 <= y <= 5:
            return "area_C"
        elif 8 <= x <= 9 and 1 <= y <= 5:
            return "area_D"
        elif 12 <= x <= 13 and 2 <= y <= 5:
            return "area_sign"
        elif 3 <= x <= 9 and 7 <= y <= 8:
            return "area_poster"
        elif 4 <= x <= 5 and 10 <= y <= 11:
            return "area_wc1"
        elif 6 <= x <= 9 and 10 <= y <= 11:
            return "area_room1"
        elif 10 <= x <= 11 and 10 <= y <= 11:
            return "area_room2"
        elif  x == 1 and 10 <= y <= 11:
            return "area_ladder1"
        elif x == 14 and 10 <= y <= 11:
            return "area_ladder2"
        elif 2 <= x <= 11 and 15 <= y <= 18:
            return "area_disc"
        elif 2 <= x <= 11 and 19 <= y <= 28:
            return "area_main"
        elif 14 <= x <= 15 and 19 <= y <= 20:
            return "area_serve"
        elif 14 <= x <= 15 and 21 <= y <= 24:
            return "area_room3"
        elif 14 <= x <= 15 and 25 <= y <= 26:
            return "area_room4"
        elif 14 <= x <= 15 and 27 <= y <= 28:
            return "area_wc2"
        else:
            return "area_other"
    else:
        if 2 <= x <= 9 and 1 <= y <= 5:
            return "area_canteen"
        elif 10 <= x <= 11 and 1 <= y <= 5:
            return "area_room5"
        elif 13 <= x <= 15 and 0 <= y <= 5:
            return "area_leisure"
        elif  x == 1 and 10 <= y <= 11:
            return "area_ladder3"
        elif x == 14 and 10 <= y <= 11:
            return "area_ladder4"
        elif 4 <= x <= 5 and 10 <= y <= 11:
            return "area_wc3"
        elif 6 <= x <= 7 and 10 <= y <= 11:
            return "area_room6"
        else:
            return "area_other"


day1_id = csv.reader(open("untitled/chinavis19/data_cluster/day1_id.csv", "rb"))

day1_all_data =[]
files = open("day1.csv", "rb")
day1_data = csv.reader(files)
for line in day1_data:
    day1_all_data.append(line)
files.close()

print len(day1_all_data)

day1_id_tra = {"data":[]}

for x in day1_id:
    if x[0] != 'id':
        print x[0]
        id_data = {'id':x[0],'trajectory':[]}
        remove_index =[]

        for i,line in enumerate(day1_all_data):
            if x[0] == line[0]:
                id_data['trajectory'].append([line[2],line[3]])
                remove_index.append(i)

        for x in remove_index:
            if x < len(day1_all_data):
                del day1_all_data[x]

        day1_id_tra['data'].append(id_data)

print day1_id_tra

# json_str = json.dumps({"data":day1_id_tra})
#
# with open('day1_id_tra.json','w') as f:
#     json.dump(json.loads(json_str),f)
#     print "处理完成...."








