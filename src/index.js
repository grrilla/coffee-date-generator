function findBestPartner(dateCandidate, dateCandidates) {
	// pair off with next participant with !dep && count=0
	// increment count for both
	for (let i = 0; i < dateCandidates; i++) {
		const possibleCandidate = dateCandidates[i];
		if (dateCandidate.department && possibleCandidate.department && dateCandidate.department !== possibleCandidate.department) {
			// thingz
		}
	}

	return { foo: 'bar' };
}

function pairPeople(participants) {

	const pairings = { matchPool: [] };

	if (length < 1) {
		return pairings;
	}

	const dateCandidates = participants.map((value) => {
		return { ...value, dateCount: 0 };
	});

	// name, department, dateCount
	// pair off with next participant with !dep && count=0
	// increment count for both
	// go next; if already count > 0, go next immediately
	// else pair off as above
	//

	for (let i = 0; i < participants.length; i++) {
		if (dateCandidates[i].dateCount === 0) {
			const dateCandidate = dateCandidates[i];
			pairings.matchPool.push({
				personOne: dateCandidate,
				personTwo: findBestPartner(dateCandidate, dateCandidates),
			});
		}
	}

	return pairings;
}

module.exports = { pairPeople, findBestPartner };
