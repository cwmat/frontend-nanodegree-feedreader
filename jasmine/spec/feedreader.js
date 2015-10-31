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


    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have valid URLs', function() {
      allFeeds.forEach(function(feed) {
        // Assert that the feed URL is defined
        expect(feed.url).toBeDefined();

        // Assert that the URL is not empty
        expect(feed.url.length).not.toBe(0);
      });
    });


    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have valid names', function() {
      allFeeds.forEach(function(feed) {
        // Assert that the feed name is defined
        expect(feed.name).toBeDefined();

        // Assert that the name is not empty
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  /* Write a new test suite named "The menu" */
  describe('The menu', function() {

    /* Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      // Assert that the menu is closed on start up
      // The $() wrapper runs when the DOM is ready on first load making this a valid assertion
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });


    /* Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when clicked', function() {
      // Reassert that default position is closed (in case Jasmine runs funcitons oout of sync like some other test frameworks do)
      expect($('body').hasClass('menu-hidden')).toBe(true);

      // Assert that when menu icon is clicked the first time the menu is visible
      $('i.icon-list').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);

      // Assert that when menu icon is clicked a second time the menu is invisible
      $('i.icon-list').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

  /* Write a test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test wil require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */
  // Assert that at least one entry exists
  it('has at least one entry', function(done) {
    expect($('div.feed a.entry-link article').hasClass('entry')).toBe(true);
    done();
  });

  });

  /* Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    var load1,
        load2;

    beforeEach(function(done) {
      loadFeed(0, function() {
        load1 = $('.entry').text();
        // done();
      });
      loadFeed(1, function() {
        load2 = $('.entry').text();
        done();
      });
    });

    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('content actually changes', function(done) {
      // Assert that content changes
      expect(load1).not.toBe(load2);

      done();
  });
});
}());
