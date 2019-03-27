module.exports = {
	"automock": false,
	testURL: 'http://localhost',
	testPathIgnorePatterns: [
		'/node_modules/',
		'/esm/'
	],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
		// '\\.(css|less|sss|postcss)$': 'identity-obj-proxy'
	},
	setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
	snapshotSerializers: [
		'enzyme-to-json/serializer'
	],
    verbose: true,
};