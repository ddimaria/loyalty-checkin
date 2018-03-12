import { expect } from 'chai';
import { add, addCheckin, sendEmail, getCheckinCount, get, remove, parsePhone, calcualtePoints, isValidPhone } from './../app/user';

const user = {'email': 'david.p.dimaria@gmail.com', 'firstName': 'David', 'lastName': 'DiMaria', 'phone': '999-999-9999'};

describe('users', () => {

  beforeEach(() => {
    remove(user.phone);
  });

  afterEach(() => {
    remove(user.phone);
  });

  it('should add and get a user', done => {
    add(user.phone, user.firstName, user.lastName, user.email);
    const data = get(user.phone);
    expect(data).to.have.keys('phone', 'firstName', 'lastName', 'email');
    done();
  });

  it('should remove a user', done => {
    add(user.phone, user.firstName, user.lastName, user.email);
    remove(user.phone);
    const data = get(user.phone);
    expect(data).to.be.undefined;
    done();
  });

  it('should parse a phone number', done => {
    const phone = parsePhone(user.phone);
    expect(phone).to.eq('+19999999999');
    done();
  });

  it('should remove a user', done => {
    add(user.phone, user.firstName, user.lastName, user.email);
    remove(user.phone);
    const data = get(user.phone);
    expect(data).to.be.undefined;
    done();
  });

  it('should validate a phone number', done => {
    const isInValid = isValidPhone('i-dig-java-scrpt');
    expect(isInValid).to.be.false;

    const isValid = isValidPhone('1-303-867-5309');
    expect(isValid).to.be.true;
    done();
  });

  it('should not error on sending an email', done => {
    const send = sendEmail(user.email, 50);
    done();
  });

  it('should count checkins', done => {
    add(user.phone, user.firstName, user.lastName, user.email);
    addCheckin(user.phone);
    addCheckin(user.phone);
    addCheckin(user.phone);

    const count = getCheckinCount(user.phone);

    expect(count).to.eql(3);

    done();
  });

  it('should calculate points', done => {
    add(user.phone, user.firstName, user.lastName, user.email);
    const countZeroCheckin = calcualtePoints(user.phone);
    expect(countZeroCheckin).to.eql(0);

    addCheckin(user.phone);
    const countOneCheckin = calcualtePoints(user.phone);
    expect(countOneCheckin).to.eql(50);

    addCheckin(user.phone);
    addCheckin(user.phone);
    const countThreeCheckins = calcualtePoints(user.phone);
    expect(countThreeCheckins).to.eql(90);

    done();
  });

});
