import { getWinningVote } from './getWinningVote';

const votesCountObj = { 644: "2", 645: "1", 646: "0", total: "3"}
const positions = [{ id: 644, name: "Oui" }, { id: 645, name: " Non" }, { id: 646, name: " Sans opinion" }]

it('should render the correct results', () => {
    const winningVote = getWinningVote(votesCountObj, positions);
    expect(winningVote.totalVotes).toBeTruthy();
    expect(winningVote.winningPositionObj).toBeTruthy();
    expect(winningVote.totalVotes).toEqual("3");
    expect(winningVote.winningPositionObj).toEqual({ count: 2, id: '644', name: 'Oui' });
});

it('should return empty values if arguments are empty', () => {
    const winningVote = getWinningVote({}, []);
    expect(winningVote.totalVotes).toEqual(0);
    expect(winningVote.winningPositionObj).toEqual({});
});

it('should return empty values if arguments are not the right type', () => {
    const winningVote = getWinningVote("oui", 5);
    expect(winningVote.totalVotes).toEqual(0);
    expect(winningVote.winningPositionObj).toEqual({});
});