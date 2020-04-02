CREATE TABLE symptom_report (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  user_id varchar(64) NOT NULL,
  report_id varchar(64) NOT NULL,
  date date NOT NULL,
  updated_at datetime NOT NULL,
  latitude float NOT NULL,
  longitude float NOT NULL,
  has_no_symptom boolean NOT NULL,
  temperature float NOT NULL,
  temperature_unit varchar(1) NOT NULL,
  dry_cough_frequency varchar(64) NOT NULL,
  dry_cough_intensity varchar(64) NOT NULL,
  dry_cough_disruption varchar(64) NOT NULL,
  tiredness int NOT NULL,
  shortness_of_breath_feeling varchar(64) NOT NULL,
  shortness_of_breath_fainting boolean NOT NULL,
  has_aches_and_pains boolean NOT NULL,
  aches_and_pains_frequency varchar(64) NOT NULL,
  sore_throat_feeling varchar(64) NOT NULL,
  sore_throat_status varchar(64) NOT NULL,
  has_diarrhoea boolean NOT NULL,
  diarrhoea_frequency varchar(64) NOT NULL,
  has_nausea boolean NOT NULL,
  nausea_frequency varchar(64) NOT NULL,
  has_runny_nose boolean NOT NULL,
  runny_nose_frequency varchar(64) NOT NULL,
  sense_of_taste_description varchar(64) NOT NULL,
  sense_of_smell_description varchar(64) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;