### Description
Add a button in mobile view to toggle display of space or profile sidebar.

WIP, don't use!

Most of the time, the right sidebar is just a goodie. But sometimes, there
is vital functionality in there, that mobile devices won't show. This little
module should help in those cases.

Unfortunately, i couldn't figure out how to make it work decently. It's all
fine at first. Clicking something other than "Stream", like "Files" in the
space-menu makes the toggle button disappear - as it should, as there is no
sidebar in the "Files" view. Problem is, it doesn't reappear when clicking
"Stream" again. Needs some uncommon eventhandlers, i guess... So for now
there's a background job running. Every 100ms it checks if the toggle button
isn't there when it should be and vice versa... uuuuuuuugly!

__Module website:__ <https://github.com/Themroc/humhub_mobile-sidebar>

__Author:__ Themroc <7hemroc@gmail.com>

### Changelog

<https://github.com/Themroc/humhub_mobile-sidebar/commits/master>

### Bugtracker

<https://github.com/Themroc/humhub_mobile-sidebar/issues>

### ToDos

- fix css: when resizing window, there's a 3-pixel-zone where the toggle-
  button hangs below the menu.
- more testing
- that fancy swipe thingie
