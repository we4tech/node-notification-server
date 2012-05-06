#!/usr/bin/env node

var command = require('../lib/command'),
    processor = new command.Processor(process.argv);

processor.run();