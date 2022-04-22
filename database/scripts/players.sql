SELECT per.position, p.name,  per.total_score, 
   --COALESCE(round.strikes[1], 0) as round1_strikes, COALESCE(round.score[1], '') as round1_score,
   --COALESCE(round.strikes[2], 0) as round2_strikes, COALESCE(round.score[2], '') as round2_score, 
   --COALESCE(round.strikes[3], 0) as round3_strikes, COALESCE(round.score[3], '') as round3_score,
   COALESCE(round.strikes[4], 0) as round4_strikes, COALESCE(round.score[4], '') as round4_score, 
   per.total_strikes 
FROM main.player_event_result per
LEFT JOIN main.player p ON p.id_player = per.player_id
LEFT JOIN LATERAL (
   SELECT array_agg(perr.strikes) AS strikes, array_agg(perr.score) AS score
   FROM main.player_event_result_round perr
   WHERE  perr.player_id = p.id_player and perr.event_id = per.event_id
   ) round ON 1=1
WHERE per.event_id = 0
ORDER BY per.position_id ASC, p.name ASC
--ORDER BY regexp_replace(per.total_score, 'E', '9999', 'g')::int ASC
--ORDER BY round.score[4] DESC, p.name ASC
;   