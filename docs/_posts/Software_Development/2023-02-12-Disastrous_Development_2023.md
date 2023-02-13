---
title: WIP: Disastrous Development 2023
categories:
  - Software Development
tags:
  - Software Development
last_modified_at: 2023-02-12
---

I encountered (also working for still now) a disastrous development.  
Terrible developer experience and poor product quality.  
The project began from November last year, and the product will be relased the first of March.  
I had already experienced some damn developments but this was definitely the worst one for my mental.  
I don't attemt to claim that certain person caused the disaster (because this was a team development), but surely I should retrospect about this for developments in the future.  

# Project Overview

Our product was a web application.  

Project members associated with development were
- project supervisor (PS)
- project manager (PM)
- tech lead (TL)
- three engineers (implementers)
  - me

Only three engineers were implementers; TL didn't implement anything, just define the specification with PM and design the system.  
I was one of the implementers in this team.  

TL determined waterfall for development style and scheduled all tasks and their assignees.  

We worked remotely and used Slack for communication tool.  
Also we used Canban board for project management tool, and each implementer was assigned to some scheduled tasks.  

# What was Bad?

- Team didn't have concept/goal
  - every member didn't look at the same direction
  - we did KPT (Keep Problem Try) method but anyone didn't realize what is the matter, what is good, and where we should go
  - team members couldn't have motivation enough

- Responsibility each member has was ambiguas
  - we hadn't clarified who does what to do
  - this caused to burden implementers because every actual work inevitably comes to implementers finally

- Tech lead hadn't functioned
  - i assumed that he didn't realize what to do as a tech lead in this team
  - he didn't review code enough, resolve technical difficulties, do any task
    - he couldn't help implementers implement because he didn't know how implementers implement and didn't have enough knowledge about language/libraries we used and how the features work that we creating 
  - just made the schedule and ask if the development is on schedule

- Implementers burdend 
  - implementers had to review code themselves although they didn't had enough information about the specification and the architecture of the system

- Poor specification
  - those who determined specification of the featureas of the system didn't document enough
  - implementers wrote code as didn't realize what they are actually creating is

- Poor software design
  - tech lead and one implementer defined the API specification and DB models
  - they didn't document enough on them and share other implementers
  - poor designing resulted in poor development schedule

- Poor development schedule
  - i guess this was one of the biggest causes of disaster
  - the development schedule was like
    - design the system
    - implement frontend at all
    - implement backend at all
    - integrate frontend and backend (this was estimated 0 days for the first time!)
    - integration test
  - awful backend development
    - each task was created per API
    - you know application consists of multi-layer or multi-component
      - such as model, CRUD and business logic
    - the schedule completely ignore the software design
    - consequently a lot of conflicts occur on model layers and CRUD layers in our implementing
  - integrating frontend and backend at once and also even at last takes too high risk
    - after all a lot of bug was found
      - conflicts between frontend and backend
      - couldn't work as is then must change the specification or the implementation
      - implementers was hurried and forced on work to fix them in the short rest of the schedule
    - we found that some features don't look nice when actually using the application ourselves

# Then, What Should We Do?
