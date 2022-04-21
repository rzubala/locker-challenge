SELECT p.name, per.position, per.position_id, per.total_score, per.total_strikes
   --round.strikes[1] as round1_strike, round.strikes[2] as round2_strike, round.strikes[3] as round3_strike, round.strikes[4] as round4_strike,
   --round.score[1] as round1_score, round.score[2] as round2_score, round.score[3] as round3_score, round.score[4] as round4_score
FROM main.player_event_result per
LEFT JOIN main.player p ON p.id_player = per.player_id
LEFT JOIN LATERAL (
   SELECT array_agg(perr.strikes) AS strikes, array_agg(perr.score) AS score
   FROM main.player_event_result_round perr
   WHERE  perr.player_id = p.id_player and perr.event_id = per.event_id
   ) round ON true
WHERE per.event_id = 0
ORDER BY per.position_id ASC, p.name ASC
--ORDER BY NULLIF(regexp_replace(per.total_score, 'E', '9999', 'g'), '')::int ASC
;