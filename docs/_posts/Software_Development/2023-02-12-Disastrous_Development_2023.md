---
title: Disastrous Development 2023
categories:
  - Software Development
tags:
  - Software Development
last_modified_at: 2023-02-24
---

I encountered (also working for still now) a disastrous development. Terrible developer experience and poor product quality.  

The project began from November last year, and the product will be relased the first of March. I had already experienced some damn developments but this was definitely the worst one for my feeling.  

I don't attempt to claim that certain person was cause of the disaster (because this was a team development), but surely I should retrospect about this for developments in the future.  

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

- Mission and responsibility each member has was ambiguas
  - we hadn't clarified who does what to do
  - this caused to burden implementers because every actual work inevitably comes to implementers finally

- Implementers burdend 
  - implementers had to review code themselves although they didn't had enough information about the specification and the architecture of the system
    - i requested this because i hadn't been able to agree PR review from TL when the previous project
      - i supposed that it was bad that TL himself wouldn't implement anything and that caused many conflicts between implementers and reviewer
      - at that time, the TL looks a client rather than an engineer
    - but now i think reviewing between implementers ourselves were failure because
      - implementer couldn't concentrate on implementing enough
      - no one of us didn't have the authority to determine the specification

- Poor specification
  - those who determined specification of the featureas of the system didn't document enough
  - implementers wrote code as didn't realize what they are actually creating is

- Poor software design
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
  - integration test and bug fixes in too short period 
    - test man-hour was about 1/20 of entire schedule!

# Then, What Should We Do?

- Build our *team*
  - we should clarify our team culture, then what we should do and should not do for that
    - list up things we put priority on then share them
    - building environment/atomosphere to be able to discuss anything without guess and hesitation
  - we need a *strong* leader who can group up team following the agreed team culture

- Clarify mission and responsibility of each member
  - e.g. what the mission/purpose of TL is, then what TL should do and not do for that

- Clarify specification
  - PM, TL or whoever can do it should determine the specification more detail
  - they should document them then share them with other team members

- Determine software design corresponding to the specification

- Determine more considered schedule
  - schedule should be derived from the design
  - in my opinion, it might be better to develop the features incrementally
    - developers are the first users of what we are creating
      - should get feedback as soon as possible then improve our product as much as possible
    - we can gradually extend our development environment to check if the function works as we thought using already developed features
    - decrease conflicts at integration
  - arrange more time to test and bug-fixing

- Clarify implementation policy/guideline
  - determine and document implementation policy/guideline then share it with every implementer
  - reviewer should be one or two
    - the less minds to determine the design, the more smooth the development and the more sophisticated the software
    - mitigate burden of implementers
  - reviewer himself should also write code
    - observe and figure out the actual development problems
    - his implementation could be a catalyst for implementers
    - -> decrease conflicts between reviewer and implementers
