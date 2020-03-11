import sys
import csv

BOOLEAN_MAPPINGS = {
    "0": 0,
    "1": 1,
    "No": 0,
    "Yes": 1,
    '': None
}

TAGS = [

] # add stuff in here when doing the sheets for combat and skill talents

# acquire filename
if (len(sys.argv) > 1):
    FILENAME = sys.argv[1]
else:
    FILENAME =  "No filename given"

# wraps strings in quotes
def formatStringOrInt(value):
    if (type(value) is int):
        return str(value)
    else:
        return '"{}"'.format(value)

# formats a single row
def buildFieldRow(field, value, isList=False, isLast=False):
     # should not write a line if there is no value
    if value is None:
        return ''
    if isList and len(value) == 1 and value[0] == '': # if this is a list containing a single empty string (happens if you split on empty string)
        return ''

    # trailing commas aren't allowed, so if this is the last row, we shouldn't include them (this handles the trailling comma for the whole element)
    if isLast: #
        maybeComma = ''
    else:
        maybeComma = ','

    # let the fun begin
    outString = '\t\t\t"{}": '.format(field) # put field name in the appropriate things

    if isList: # do list delimiters and stuff
        outString += '[ \n'
        for e in value:
            outString += '\t\t\t\t{},\n'.format(formatStringOrInt(e))
        outString = outString[:-2] # strip of the last comma and newline because trailing commas arent allowed (this handles the trailing comma in the list)
        outString += '\n\t\t\t]{}\n'.format(maybeComma) # the newline is re-added at the beginning here

    else: # single value, just add quotes
        outString += '{}{}\n'.format(formatStringOrInt(value), maybeComma)

    return outString

# main
with open(FILENAME) as f:
    reeder = csv.reader(f)

    with open('out.txt', 'w') as outfile:
        outfile.write('{\n\t"affixes": [\n')
        isFirstRow = True # we want to ignore the first row because it only contains column headers
        affixesString = '' # we make a huge string of all the affixes we're gonna write (so we can strip trailing commas)

        for row in reeder:
            if isFirstRow:
                isFirstRow = False
            else:
                # print row[0] # debug

                affixesString += '\t\t{\n'

                # by convention, all text fields and enums are stored in lower case except descriptions
                affixesString += buildFieldRow('name', row[0].lower())
                affixesString += buildFieldRow('slot', row[1].lower())
                if (row[3].lower() == "mundane"): # affixType
                    cost = int(float(row[2]) * 2)
                else:
                    cost = int(row[2])
                affixesString += buildFieldRow('cost', cost)
                affixesString += buildFieldRow('source', 'official:core')
                affixesString += buildFieldRow('affixType', row[3].lower())
                affixesString += buildFieldRow('elements', row[4].split(', '), isList=True)
                affixesString += buildFieldRow('prerequisites', row[5].lower())
                affixesString += buildFieldRow('maxReplicates', int(row[6]))
                affixesString += buildFieldRow('doubleEdged', BOOLEAN_MAPPINGS[row[7]])
                affixesString += buildFieldRow('descShort', row[8])
                affixesString += buildFieldRow('descLong', row[9])
                affixesString += buildFieldRow('tags', TAGS, isLast=True, isList=True)
                # affixesString += buildFieldRow('tags', row[10].split(', '), isList=True)

                affixesString += '\t\t},\n'

        affixesString = affixesString[:-2] # strip off the final newline and trailing comma because trailing commas are not allowed
        affixesString += '\n\t]\n}'
        outfile.write(affixesString) # :wq
