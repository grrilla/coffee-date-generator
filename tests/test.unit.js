const { expect } = require('chai');

const generator = require('../src');

describe('generator', () => {
	function addDepartment(person, department) {
		return { ...person, department };
	}

	const personA = { name: 'A' };
	const personB = { name: 'B' };
	const personC = { name: 'C' };
	const personD = { name: 'D' };
	const personE = { name: 'E' };

	it('returns an object', () => {
		expect(generator.pairPeople([])).to.not.eql(undefined);
		expect(generator.pairPeople([]).matchPool).to.not.eql(undefined);
	});

	it('returns an object containing a match pool for qualified pairs', () => {
		expect(generator.pairPeople([]).matchPool).to.not.eql(undefined);
	});

	it('returns a match pool of qualified pairs from participant input', () => {
		const participants = [personA, personB];
		expect(generator.pairPeople(participants).matchPool).to.eql([
			{
				personOne: personA,
				personTwo: personB,
			},
		]);
	});

	it('returns a match pool of qualified pairs from participant input for any positive, even length', () => {
		const participants = [personA, personB, personC, personD];
		expect(generator.pairPeople(participants).matchPool).to.eql([
			{
				personOne: personA,
				personTwo: personB,
			},
			{
				personOne: personC,
				personTwo: personD,
			},
		]);
	});

	it('returns a match pool of qualified pairs from participant input for all', () => {
		const participants = [personA, personB, personC, personD, personE];
		expect(generator.pairPeople(participants).matchPool).to.eql([
			{
				personOne: personA,
				personTwo: personB,
			},
			{
				personOne: personC,
				personTwo: personD,
			},
			{
				personOne: personE,
				personTwo: personA,
			},
		]);
	});

	it('prefers to qualify pairs across departments', () => {
		const participants = [
			addDepartment(personA, 'eng'),
			addDepartment(personB, 'eng'),
			addDepartment(personC, 'impl'),
			addDepartment(personD, 'impl'),
		];
		generator.pairPeople(participants).matchPool.forEach((pair) => expect(pair.personOne.department).to.not.eql(pair.personTwo.department));
	});
});
