'use strict';

const assert = require('assert');
const JsonML = require('jsonml.js');
const addDescription = require('../lib/node');

function getCommonMarkdownData() {
  return {
    content: [
      'article',
      [ 'p', 'This is description.' ],
      [ 'hr' ],
      [ 'p', 'This is main content.' ],
    ],
  };
}

describe('./lib/node.js', function() {
  it('should add description to markdown data', function() {
    const markdownData = getCommonMarkdownData();
    const processedMarkdownData = addDescription(markdownData);
    assert.ok(processedMarkdownData.description);
  });

  it('should wrap description in section', function() {
    const markdownData = getCommonMarkdownData();
    const description = addDescription(markdownData).description;
    assert.strictEqual(JsonML.getTagName(description), 'section');
  });

  it('should parse description and main content correctly', function() {
    const markdownData = getCommonMarkdownData();
    const processedMarkdownData = addDescription(markdownData);
    assert.deepEqual(
      JsonML.getChildren(processedMarkdownData.description), [[ 'p', 'This is description.' ]]
    );
    assert.deepEqual(
      JsonML.getChildren(processedMarkdownData.content), [[ 'p', 'This is main content.' ]]
    );
  });

  it('should not add description to markdown data, if description doesn\'t exist', function() {
    const markdownData = {
      content: [
        'article',
        [ 'p', 'This is main content.' ],
      ],
    };
    const processedMarkdownData = addDescription(markdownData);
    assert.ok(!('description' in processedMarkdownData));
  });
});
