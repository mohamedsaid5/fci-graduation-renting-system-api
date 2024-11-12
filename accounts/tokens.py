from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.crypto import constant_time_compare, salted_hmac
from django.utils.http import int_to_base36, base36_to_int
from django.contrib.auth.hashers import make_password
import time
import datetime

class ExpirableTokenGenerator(PasswordResetTokenGenerator):
    def __init__(self, timeout_seconds=900):
        super().__init__()
        self.timeout_seconds = timeout_seconds

    def make_token(self, user):
        """
        Return a token that can be used once to do a password reset
        for the given user within a given timeout period.
        """
        timestamp = int(time.mktime(datetime.datetime.now().timetuple()))
        return self._make_token_with_timestamp(user, timestamp)

    def check_token(self, user, token):
        """
        Check that a password reset token is correct for a given user.
        """
        if not (user and token):
            return False

        # Parse the token
        try:
            ts_b36, _ = token.split("-")
            ts = base36_to_int(ts_b36)
        except ValueError:
            return False

        # Check if the token has expired
        if (int(time.mktime(datetime.datetime.now().timetuple())) - ts) > self.timeout_seconds:
            return False

        # Check that the token has not been tampered with
        if not constant_time_compare(self._make_token_with_timestamp(user, ts), token):
            return False

        return True

    def _make_token_with_timestamp(self, user, timestamp):
        """
        Generate a token with a given timestamp.
        """
        ts_b36 = int_to_base36(timestamp)
        hash = salted_hmac(
            self.key_salt,
            self._make_hash_value(user, timestamp),
            secret=self.secret,
        ).hexdigest()[::2]  # Limit to 20 characters to shorten the URL.
        return f"{ts_b36}-{hash}"

    def _make_hash_value(self, user, timestamp):
        """
        Hash the user's primary key and some state that might change.
        """
        login_timestamp = '' if user.last_login is None else user.last_login.replace(microsecond=0, tzinfo=None).isoformat()
        return (
            str(user.pk) + str(timestamp) + str(user.is_active) +
            login_timestamp + make_password(user.password)
        )

token_generator = ExpirableTokenGenerator()
