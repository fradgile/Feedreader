/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           });
         });

         /* Loop through each feed
          * in the allFeeds object and ensure it has a name defined
          * and that the name is not empty.
          */
         it('names are defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });
    });

    describe('The menu', function() {

      /* Test that the menu element is hidden by default. */
       it('is hidden by default', function() {
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

       /* Test that the menu changes visibility when the menu icon is clicked.*/
        it('changes visibility when icon clicked', function() {
          var hasMenuHiddenClass = hasMenuHiddenClass = $('body').hasClass('menu-hidden');

          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).not.toBe(hasMenuHiddenClass);

          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(hasMenuHiddenClass);
        });

      });

    describe('Initial Entries', function() {
      /*  Test that when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       beforeEach(function(done) {
         loadFeed(0, function() {
           done();
         });
       });

       it('have at least one entry', function(done) {
         var feedEntrySize = $('.feed .entry').size()
         console.log('feedEntrySize = ' + feedEntrySize);
         expect(feedEntrySize).toBeGreaterThan(0);
         done();
       });

    });

    describe('New Feed Selection', function() {
    /* Test that when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
      var initialHTML, newHTML;

      beforeEach(function(done) {
        loadFeed(0, function() {
          // Load the first Feed and get the original/initial HTML
          initialHTML = $('.feed').html();
          //console.log('initialHTML = ' + initialHTML);
          done();
        });
      });

      it('content actually changes', function(done) {
        loadFeed(1, function () {
          // Load the second Feed and get the HTML. Compare initial and new HTML
          newHTML = $('.feed').html();
          //console.log('newHTML = ' + newHTML);
          expect(initialHTML).not.toBe(newHTML);
          done();
        });
      });

    });

}());
