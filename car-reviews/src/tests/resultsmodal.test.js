import ResultsModal from '../components/Modals/resultsmodal';

describe('Results Modal', () => {
  const props = {
    title: 'The best car ever!',
    content: 'Seriously a great car!',
    score: 5,
    carImage: '',
    car: {
      year: 2018,
      make: 'Toyota',
      model: 'Camry'
    },
    user: {
      username: 'robinhood'
    }
  };

  const wrapper = shallow(<ResultsModal {...props} />);

  // All tests will go here
  it('shallow renders without crashing', () => {
    wrapper;
    expect(wrapper).toMatchSnapshot();
  });

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('Testing state of Results Modal', () => {
    it('modal is defaulted to false', () => {
      expect(wrapper.state('modal')).toBe(false);
    });

    it('counter is defaulted to 0', () => {
      expect(wrapper.state('counter')).toBe(0);
    });

    it('paid flag for a user is defaulted to false before updateUserCounter is called', () => {
      expect(wrapper.state('paid')).toBe(false);
    });
  });
});
