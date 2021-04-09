export const DATE_FORMAT = {
  MY_HOURS: 'events',
};

export const formatDate = (dateString, type = DATE_FORMAT.MY_HOURS) => {
  const timestamp = new Date(dateString);

  switch (type) {
    case DATE_FORMAT.MY_HOURS:
      return new Intl.DateTimeFormat('en', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      }).format(timestamp);

    default:
      return 'NOT SUPPORTED';
  }
};

export const dummy = 1;
