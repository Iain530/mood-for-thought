
##### Day

A day is made up of 0 or more logs, a step count, and sleep data. The user can see days and the information stored on the day in a list view and a calendar view. A day's step count is the number of steps the user has taken that day. Sleep data is the users opinion on the quality of the previous night's sleep and duration for which they slept. This sleep information will only be stored if provided by the user.

Day:
  - 0 or more Logs
  - Step count
  - Sleep information (?)

---

##### Log

Users will be prompted through notifications to add a log. When creating a log, a mood is the only required information. The user will choose a mood from the selection provided. The user can then add activities to the log. These will be activities the user has done between their last log and the new log.

Log:
  - Mood
  - 0 or more Activities

---


##### Mood
When adding a log the user will choose a mood from the following options:

  - Angry
  - Joyful
  - Uncomfortable
  - Sad
  - Content

Each mood has it's own colour, respectively:

  - red
  - yellow
  - purple
  - blue
  - green

It is important that these colours are distinct and match their existing cultural associations as closely as possible. This will allow the user to differentiate them at a glance.

---

##### Activity
An activity can be added to a log. This lets the user keep track of which activities they have done on which days. With enough time and usage of the application, this will also show the user potential connections between their mood and the activities they take part in.

Default activity templates will be provided, allowing the user to add activities to their logs right away. Users can edit the details of these activities, create their own activities, and delete any activities they do not wish to use.

An activity has a name, a colour, an icon to represent the activity, and a description to give more information about the activity.

Activity:
  - Name
  - Colour
  - Icon
  - Description

---

##### Sleep

The user will be prompted to input information on their sleep through a notification. This notification will be sent in the morning. The user will be asked to select a sleep quality. The user can also enter the length of their sleep.

Sleep:
  - Sleep quality
  - Sleep length (?)

---

##### Sleep quality
When adding sleep information, the user will choose from the following options:

  - Terrible
  - Bad
  - Good
  - Great

Each quality has a colour on a gradient from red to green respectively.
