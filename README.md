glbse-googledoc-macro
=====================

Repository of Google Docs javascript macros to process GLBSE exported CSV files

How to use:
===========

    . Log into your GLBSE account.
    . Export your GLBSE data. You should get a file called 'account_history.csv'
    . Go and create a new spreadsheet document in Google Docs
    . In the newly created spreadsheet, go to Menu->File->Import...
    . Press 'Choose file' button and select the previously downloaded file 'account_history.csv'
    . Make sure to select the 'Insert new sheet(s)' radio button
    . Press the 'Import' button. This should get you a spreadsheet with a sheet called 'account_history'
    . Rename that sheet 'Import'
    . Go to Menu->Tools->Script Editor
    . A new window open that lets you edit code
    . Delete all of the existing code in there and paste the code found in file script.js
    . Press the 'Save' button above the code (the stylized floppy disk icon)
    . In the small drop menu above the code, select the 'onOpen' function
    . Press the 'Run' button (stylized '>')

At this point, you can go back to your spreadsheet window,
you should see a new menu entry called 'Scripts' in there.

Go to : Menu->Scripts->'P&L Calculator'

Watch it operate (it's not particularly fast, but gets the job done).

Once it's done, a new sheet called 'PNL' should have appeared in your spreadsheet
that contains a per-ticker summary of what happened in your account.

Next time around:

     . Delete sheet 'Import'
     . Re-do the CSV import
     . Rename sheet 'account_history' to 'Import'
     . Just re-run the script.


Improvements and tips at 1ZnortsoStC1zSTXbW6CUtkvqew8czMMG are welcome

Enjoy
