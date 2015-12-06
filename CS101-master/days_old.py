# By Websten from forums
#
# Given your birthday and the current date, calculate your age in days. 
# Account for leap days. 
#
# Assume that the birthday and current date are correct dates (and no 
# time travel). 
#
def isLeapYear(year):
    if year % 400 == 0:
        return True
    elif year % 100 == 0:
        return False
    elif year % 4 == 0:
        return True
    else:
        return False

def dayOfYear(year, month, day): #which day of the year is it? 
    daysOfMonths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    days_in_year = day-1 #the first day of the year should be day 0
    i = 0
    
    if isLeapYear(year) == True:
        daysOfMonths[1] = 29
    while i < month-1: #convert months into days
        days_in_year = daysOfMonths[i] + days_in_year
        i = i + 1
    return days_in_year
        
def daysToEnd(year, month, day): #how many days until the end of the year?
    if isLeapYear(year)==True:
        return 366 - dayOfYear(year, month, day)
    else:
        return 365 - dayOfYear(year, month, day)


def daysBetweenDates(year1, month1, day1, year2, month2, day2):
    yearsBetween = year2 - year1
    if year1 == year2:
        days = dayOfYear(year1, month1, day1) + dayOfYear(year2, month2, day2)
        return days 
    else:
        days = dayOfYear(year2, month2, day2) + daysToEnd(year1, month1, day1) # this returns the day since Jan 1 and days to Dec 31
    print days 
    i = year1+1
    while i < year2:
        if isLeapYear(i) == True:
            days = days + 366
            i = i + 1
        else:
            days = days + 365
            i = i + 1
    
    return days


# Test routine


def test():
    test_cases = [((2012,1,1,2012,2,28), 58), 
                  ((2012,1,1,2012,3,1), 60),
                  ((2011,6,30,2012,6,30), 366),
                  ((2011,1,1,2012,8,8), 585 ),
                  ((1900,1,1,1999,12,31), 36523)]
    for (args, answer) in test_cases:
        result = daysBetweenDates(*args)
        if result != answer:
            print "Test with data:", args, "failed"
        else:
            print "Test case passed!"

test()
